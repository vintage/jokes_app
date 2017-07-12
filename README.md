# Jokes App (Perełki)

Jokes App is a fully working hybrid mobile app built with Angular & Ionic. The original app has been released to Google Play Store & App Store.

### Showcase

You can see how the app works by downloading it from the official stores:

 - [Google Play](https://play.google.com/store/apps/details?id=com.puppybox.perelki)
 - [App Store](https://itunes.apple.com/us/app/pere%C5%82ki/id1203847447)

![Screen 1](/screens/screen1.png?raw=true "Screen #1")
![Screen 2](/screens/screen2.png?raw=true "Screen #2")
![Screen 3](/screens/screen3.png?raw=true "Screen #3")

### Version
1.2.0

### Installation

You need Ionic CLI and cordova installed globally:

```sh
$ npm i -g ionic@latest cordova@latest
```

```sh
$ git clone https://github.com/vintage/jokes_app
$ cd jokes_app
$ npm i
$ ionic cordova prepare
```

### Run

Open your favorite Terminal app and run following command:

```sh
$ ionic serve
```

The app will be available at:

```
http://localhost:8100/
```

Keep in mind that all jokes are in Polish language. If you would like to replace them with your own data simply replace the JSON file located at `src/assets/data/jokes.json`.

License
----

MIT
