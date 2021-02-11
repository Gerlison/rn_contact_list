# Contact List


This is a simple Contact List made in Expo, which can be used to register, list, edit and delete contacts from a local .db file provided by json-server.

## Table of Contents

 * [Installation](#installation)
    + [Cloning the repository](#cloning-the-repository)
    + [Installing dependencies](#installing-dependencies)
    + [Running](#running)
 * [Contributing](#contributing)
    + [Create a fork](#create-a-fork)
    + [Git Flow](#git-flow)
    + [Open a Pull Request](#open-a-pull-request)

## Installation

### Cloning the repository

Clearly you'll need [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your machine.
Navigate to a directory of your choice and clone the repository.

```bash
  git clone https://...
```

### Installing dependencies

After cloned, navigate inside the project. Change "project_folder" to the folder just created by the `clone` command

```bash
  cd project_folder/
```

You'll need to install the project's dependencies now. To do that just:

```bash
  npm install
```

or if you prefer `yarn` instead `npm`

```bash
  yarn
```

In case you haven't any of them installed, here some the links for install [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/pt-BR/docs/install/#mac-stable).

### Running

> To run a `Expo` project you'll need the [expo environment](https://docs.expo.io/get-started/installation/) setted up correctly.

Start your emulator, simulator or conect your real device following the documentation. After that run the following:

```bash
  # for android
  yarn android

  # for ios
  yarn ios

  # to start the json-server
  yarn serve
```


## Contributing

### Create a fork

To contribute to a open source project, you can do a fork from the source code, do your own changes on a copy without compromising the original.

If you don't know how to do that, follow this [guide](https://help.github.com/pt/github/getting-started-with-github/fork-a-repo).

### Git Flow

_GitFlow is a branching model for Git, created by Vincent Driessen. It has attracted a lot of attention because it is very well suited to collaboration and scaling the development team._

So, in my projects I always try to use that. It's very useful and helps to control what is happing to the code base.

Read a little bit more [about this](https://datasift.github.io/gitflow/IntroducingGitFlow.html).

### Open a Pull Request

With all your changes done, and you are ready to contribute, open a pull request to the _upstream_ `develop` branch. Your PR will be analysed, discuted and aproved gratefuly.

> About [pull requests](https://help.github.com/pt/github/collaborating-with-issues-and-pull-requests/about-pull-requests)

