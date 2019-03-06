# Intro to Blockchain Development

### Class 13 - More Hyperledger Examples 

We got started with private blockchains last week, exploring them through Hyperledger Composer and Fabric. Now we'll go a bit more in depth and look onto some specific code examples further.



Reading & Videos:

- [Composer Sample Networks](https://github.com/hyperledger/composer-sample-networks)* - This is a set of composer examples from the hyperledger organization. Try running one to see how it works, and get some ideas for how to implement solutions to problems in a permissioned blockchain.
- [Fabric Insurance App](https://github.com/IBM/build-blockchain-insurance-app) - We'll look briefly at a full Hyperledger Fabric application, instead of just using the composer framework on top of it. This is a more in-depth example, showing how an insurance network, asset owners and the police could all interact in an automated claims process on the blockchain.

### More Composer Examples

Businesses have addressed a multitude of problems in a supply chain setup with software solutions in recent years, and blockchain can improve upon them. Let's take a look first at an identity example:

**[Composer Identity Example](https://github.com/hyperledger/composer-sample-networks/tree/master/packages/pii-network)** - This shows how two users can add/revoke access to shared personally identifiable information.

### Docker

Before running our first fabric example, we'll run through some basic docker commands, go over what docker is and how to use it in a few basic configurations.

Docker is just a lightweight VM that can be easily reproduced and shared, making it simple to reproduce environments between a developer's computer and a production server. It is also very useful for making each peer in a permissioned blockchain have a predictable environment for chaincode.

#### Getting Started

If you have installed composer locally, you should have docker and docker compose. If not, you can install it with these steps or with the following link:

##### OSX

```bash
brew cask install docker
```

##### Ubuntu

```bash
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

sudo apt-get update

sudo apt-get install docker-ce
```

Similar to how Git has versioned states of code, Docker images are available in a similar repository. There is a service called DockerHub as well for sharing them, similar to GitHub. You can test out a basic example by running:

```bash
docker run hello-world
```

This will try to find an image called `hello-world`, and if it can't find it locally it will search through DockerHub for it. We'll find one, and play back a success message when it is successfully built.

Docker images can start with common configurations for many projects, and you can locate them in a similar manner to searching through a package manager. You can run the following command:

```bash
docker search ubuntu
```

Which will return a list of all images that contain the name `ubuntu`. When building one, you could pull and configure it to serve as the starting point of a project. You can also push your images up to DockerHub to share later.

To list the images you have installed, run a list command:

```bash
docker images
```

This will return a list of all docker images on your computer. 

Finally, to run the image we searched, you can run it in interactive mode with the following command:

```
docker run -it ubuntu
```

After running this, you should enter a shell inside a ubuntu VM. You can configure any dependencies in your environment from here, or if you don't have an ubuntu setup and would like to follow along with the instructions anyways, you can use this command.

#### Managing Your Containers

You can view active containers with the following command:

```bash
docker ps
```

You can use the `-a` switch afterwards to see only active containers, or the `-l` switch to see the last container you just created. When listing containers, you should see each result with a container id. This id is how you reference specific docker containers in future commands, sucn as starting or stopping it:

##### Starting

```bash
docker start my_container_id_here
```

##### Stopping

```bash
docker stop my_container_id_here
```

In addition to starting/stopping by id, you can also use the container name (for the above example, it would be `ubuntu`).

Now that we have a basic overview of docker and can start/stop containers, let's move to the next section about working with fabric.

### Moving to Fabric

We have reviewed Hyperledger Composer pretty extensively, now we can look at a production application that is based on Fabric specifically. It could also be implemented on composer, but we can showcase some of the differences and other ways it could be modified here.

To get started, clone this repository:

```bash
git clone https://github.com/IBM/build-blockchain-insurance-app
```

Run `docker login` to login to this application with DockerHub credentials, and then follow along with the build script in the repository. If you are using windows, you can also use either a VM or setup your set of images inside of an existing docker image. Then, run the following command:

```
cd build-blockchain-insurance-app
./build_ubuntu.sh
```

After it finishes, you should see all of the instances starting. You can then interact with a more complete aplication showing how peers are hosted across multiple organizations and enviornments.

#### Insurance Example

In this example, we'll see how permissioned view access could be implemented across organizations. All information is shared and notified to parties that need to access it. For example, when a claim is created involving theft, we leave it to police to confirm the theft. Once they do, all parties can see and verify that the claim came from the police.

This helps mitigate any trust issue or miscommunication issue, where one party could claim that they have not received communication or necessary information. Since rules for how the network interacts is defined in the blockchain, it streamlines an insurance claims system.

Similar systems have been approved for cars. How do you think one might be updated to take input or signals determining fault? Try to come up with some examples for how certain signals could be processed, such as a red-light camera, speed information or other data to determine fault in an accident.