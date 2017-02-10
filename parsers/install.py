import os
import shutil
from subprocess import call
import json

import click
from lxml import etree
from user_agent import generate_user_agent
from pyquery import PyQuery as pq
import requests
from tqdm import tqdm
from enchant.checker import SpellChecker

@click.group()
def cli():
    pass


@cli.command()
def parse():
    src_dir = '.'
    app_dir = '..'

    base_url = 'http://perelki.net/'
    response = requests.get(base_url, headers={'User-Agent': generate_user_agent()})
    btree = etree.HTML(response.content)

    first_page = 1
    last_page = 1 # int(btree.xpath('/html/body/div[6]/a[last()]')[0].text)

    jokes = []
    for page_nr in tqdm(range(first_page, last_page + 1), 'Parsing jokes'):
        page_url = base_url + '?ps={}'.format(page_nr)
        page_response = requests.get(page_url, headers={'User-Agent': generate_user_agent()})
        ptree = etree.HTML(page_response.content)

        nodes = ptree.xpath('/html/body/div[5]/div[@class="container" and @class!="ad"]')

        for node in nodes:
            meta_node = node.find('div[@class="about"]')

            # Many elements on the page has container class. Skip them
            # if no joke metadata available
            if not meta_node:
                continue

            node.remove(meta_node)

            pq_detail = pq(etree.tostring(node, encoding='unicode'))
            pq_meta = pq(etree.tostring(meta_node, encoding='unicode'))

            joke_text = (
                pq_detail.html().
                    replace('<br/>', '\n').
                    replace('&#13;', '').
                    replace(' ? ', ' - ').
                    strip()
            )
            joke_id = pq_meta.find('a')[1].text.strip()
            joke_rate = int(pq_meta.find('span')[1].text.strip())
            joke_date = pq_meta.find('span')[2].text.strip()

            try:
                # Some jokes don't have any author
                joke_author = pq_meta.find('span')[3].text.strip()
            except IndexError:
                joke_author = None

            checker = SpellChecker("pl")
            checker.set_text(joke_text)

            is_valid = True
            for error in checker:
                if is_valid:
                    print('*' * 7 + ' Invalid ' + '*' * 7)
                    print(joke_text)

                is_valid = False
                word = error.word

                suggestions = checker.suggest(word)
                try:
                    suggestion = suggestions[0]
                except:
                    raise Exception('Unknown suggestion for word: {}'.format(word))

                error.replace(suggestion)

            if not is_valid:
                print('*' * 7 + ' Valid ' + '*' * 7)
                joke_text_suggested = checker.get_text()
                print(joke_text_suggested)

                joke_text = joke_text_suggested

            joke = {
                'id': joke_id,
                'content': joke_text,
                'rate': joke_rate,
                'date': joke_date,
                'author': joke_author
            }
            jokes.append(joke)

    # Copy parsed file
    export_path = '{}/src/assets/data/jokes.json'.format(app_dir)
    with open(export_path, 'w') as outfile:
        json.dump(
            jokes,
            outfile,
            sort_keys=False,
            indent=2,
            ensure_ascii=False
        )


@cli.command()
def clean():
    app_dir = '..'

    os.chdir(app_dir)

    # Clear www directory
    shutil.rmtree("www", ignore_errors=True)
    os.makedirs("www")

    shutil.rmtree("node_modules", ignore_errors=True)
    shutil.rmtree("platforms", ignore_errors=True)
    shutil.rmtree("plugins", ignore_errors=True)
    call(["npm", "i"])
    call(["ionic", "state", "restore"])


@cli.command()
def build():
    provider = 'jokes_app'
    app_dir = '..'

    os.chdir(app_dir)

    call(["ionic", "resources"])

    # Build android package
    call(["ionic", "build", "android", "--prod", "--release"])

    def jarsigner(apk_name):
        call([
            "jarsigner", "-verbose",
            "-sigalg", "SHA1withRSA",
            "-digestalg", "SHA1",
            "-keystore", "puppybox-release.keystore",
            "platforms/android/build/outputs/apk/{}".format(apk_name),
            "puppybox-release"
        ])

    def zipalign(src_apk, dest_apk):
        try:
            os.remove(dest_apk)
        except:
            pass

        call([
            "zipalign",
            "-v", "4",
            "platforms/android/build/outputs/apk/{}".format(src_apk),
            "{}".format(dest_apk)
        ])

    src_apk = "android-armv7-release-unsigned.apk"
    jarsigner(src_apk)
    zipalign(src_apk, "builds/jokes_app_arm.apk".format(provider))

    src_apk = "android-x86-release-unsigned.apk"
    jarsigner(src_apk)
    zipalign(src_apk, "builds/{}_x86.apk".format(provider))

    # Build ios package, it's strange but I have to remove/add the platform
    call(["ionic", "platform", "rm", "ios"])
    call(["ionic", "platform", "add", "ios"])
    call(["ionic", "build", "ios"])


@cli.command()
def deploy():
    parse()
    build()


if __name__ == '__main__':
    cli()
