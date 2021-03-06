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
def clean_jokes():
    app_dir = '..'
    export_path = '{}/src/assets/data/jokes.json'.format(app_dir)

    data = {}
    with open(export_path, 'r') as data_file:
        data = json.load(data_file)

    for item in data:
        content = item['content']
        content = content.replace('kurw', 'kur*')
        content = content.replace('chuj', 'ch*j')
        content = content.replace('jeb', 'je*')
        content = content.replace(' ,', ',')

        for i in reversed(range(1, 6)):
            content = content.replace('!' * i, '!')
            content = content.replace('?' * i, '?')

        item['content'] = content

    with open(export_path, 'w') as outfile:
        json.dump(
            data,
            outfile,
            sort_keys=False,
            indent=2,
            ensure_ascii=False
        )


@cli.command()
def parse():
    src_dir = '.'
    app_dir = '..'

    export_path = '{}/src/assets/data/jokes.json'.format(app_dir)

    original = {}
    with open(export_path, 'r') as data_file:
        original = json.load(data_file)
    original = {o['id']: o for o in original}

    base_url = 'http://perelki.net/'
    response = requests.get(base_url, headers={'User-Agent': generate_user_agent()})
    btree = etree.HTML(response.content)

    first_page = 1
    last_page = int(btree.xpath('/html/body/div[6]/a[last()]')[0].text)

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
                    replace('\r\n', '\n').
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

            joke = original.get(joke_id)
            if joke:
                joke.update({
                    'rate': joke_rate
                })
            else:
                checker = SpellChecker("pl")
                checker.set_text(joke_text)

                is_valid = True
                for error in checker:
                    is_valid = False
                    word = error.word

                    suggestions = checker.suggest(word)
                    try:
                        suggestion = suggestions[0]
                    except:
                        pass
                    else:
                        error.replace(suggestion)

                if not is_valid:
                    joke_text = checker.get_text()

                joke = {
                    'id': joke_id,
                    'is_checked': False,
                    'content': joke_text,
                    'rate': joke_rate,
                    'date': joke_date,
                    'author': joke_author
                }
            jokes.append(joke)

    # Copy parsed file
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
    call(["ionic", "cordova", "prepare"])


@cli.command()
def build():
    provider = 'jokes_app'
    app_dir = '..'

    os.chdir(app_dir)

    call(["ionic", "cordova", "resources"])

    # Build android package
    call(["ionic", "cordova", "build", "android", "--prod", "--release"])

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
    call(["ionic", "cordova", "build", "ios"])


@cli.command()
def deploy():
    parse()
    build()


if __name__ == '__main__':
    cli()
