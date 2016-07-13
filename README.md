[![Stories in Ready](https://badge.waffle.io/QuattroSquadra/LoadTestingApp.png?label=ready&title=Ready)](https://waffle.io/QuattroSquadra/LoadTestingApp)  [![Build Status](https://travis-ci.org/Auklets/LoadEffect.svg?branch=master)](https://travis-ci.org/Auklets/LoadEffect) [![Coverage Status](https://coveralls.io/repos/github/Auklets/LoadEffect/badge.svg?branch=master)](https://coveralls.io/github/Auklets/LoadEffect?branch=master)
# Load Effect
---
![image](https://cloud.githubusercontent.com/assets/10008938/16785419/d8669496-4842-11e6-8e66-faa7f9162e5b.png)

## Description
Load Effect is a load testing API that allows you to write your own script using the API-provided scripting language to simulate real user interactions up to scale. 

Load Effect features script validation, domain validation through DNS TXT records, real-time analytics,

This application was built using React, Redux, Chartist.js, Node.js, express.js, sockets.io, MySQL, Zombie.js, docker, AWS, Digital Ocean, Travis CI, and Mocha/Chai.

## Table of Contents

1. [Usage](#usage)
1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    1. [Installing Dependencies](#installing-dependencies)
1. [API Documentation](#api-documentation)
1. [Deployment](#deployment)
    1. [Server creation](#server-creation)
        1. [AWS](#AWS)
        2. [Digital Ocean](#digital-ocean)
    1. [Shell connection](#shell-connection)
    1. [Environment setup](#environment-setup)
        1. [Environment variables](#environment-variables)
        1. [Certificates](#certificates)
    1. [Pull images](#pull-images)
    1. [Run Containers](#run-containers)
        1. [MySQL Database](#mysql-database)
        2. [Web Application](#web-application)
    1. [Monitor Containers](#monitor-containers)
1. [Worker-Master-interaction](#worker-master-interaction)
    1. [A](#A)
    2. [B](#B)
    3. [C](#C)
1. [Core Team](#core-team)
1. [Contributing](#contributing)
1. [Licensing](#license)

## Usage

1. Signup:
![image](https://cloud.githubusercontent.com/assets/10008938/16785401/bb511980-4842-11e6-955c-34952d19d33a.png)

2. Create Scenario:
![image](https://cloud.githubusercontent.com/assets/10008938/16785095/12ce6aac-4841-11e6-80f5-9f74be469158.png)

3. Scenarios Overview:
![image](https://cloud.githubusercontent.com/assets/10008938/16785327/4bea9a62-4842-11e6-9f26-156bfd5a415b.png)

4. Verify website ownership with validation token:
![image](https://cloud.githubusercontent.com/assets/10008938/16788024/fc56f8c4-4855-11e6-94bc-987e40f65bd2.png)

5. Run Scenario:
![image](https://cloud.githubusercontent.com/assets/10008938/16786320/b7ddd396-4848-11e6-883f-b12dbdea6835.gif)

## Getting Started

### Prerequisites

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Running The App

## Testing

Run:
```sh
npm test
```
## API Documentation

1. [File Structure](/documentation/FILE-STRUCTURE.md)
1. [Architecture Diagram and Flow-Chart](/documentation/ARCHITECTURE-DIAGRAMS.md)
1. [LoadEffect Overview Presentation](https://docs.google.com/presentation/d/1FYygaxJOOlUx61Xl1JGpWn2k684BjZoxiTSG3lEw_PA/edit?usp=sharing)

## Deployment

[DeploymentDocs README](https://github.com/Auklets/DeploymentDocs/README.md)

## Master-Worker Server Interaction

## Core Team

  - __Scrum Master__: [Felix Feng](https://github.com/felix2feng)
  - __Product Owner__: [Tai Huynh](https://github.com/anhtaiH)
  - __Development Team Members__: [Bill Ramsey](https://github.com/billramsey), [Christian Haug](https://github.com/cshg), [Felix Feng](https://github.com/felix2feng), [Tai Huynh](https://github.com/anhtaiH)

## Contributing

1. Fork the repo.
1. Clone it to your local computer
1. Cut a namespaced feature branch from master and name it appropriately
1. Make commits and prefix each commit with the type of work you were doing
1. BEFORE PUSHING UP YOUR CHANGES, rebase upstream changes into your branch, fix any potential conflicts, and then push to your fork.
1. Submit a pull request directly to the master
1. Someone else will perform code review to keep codebase clean
1. Fix any errors or issues raised by the reviewer and push the fixes as a single new commit
1. Repeat until the pull request is merged.

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines in detail.

## License

M.I.T
