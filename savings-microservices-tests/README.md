# co-tests

### Setup
```
node --version 
npm install
``` 

Node - 8.x (it works)

### Proxy Setup

To run it in windows proxy needs to be configured.

```
export HISTCONTROL=ignoreboth
# Note HISTCONTROL is used to skip storing this command in history as it contains password details. 
# do not remove the leading spaces before command below
# export fileId=...
# export pwd=...
  export https_proxy="http://$fileId:$pwd@proxyarray.service.group:8080"
  export no_proxy=".test.group"
```
### Lab Setup
consumer-onboarding\testing\environments\co-stateless.postman_globals.json contains lab specific config
change it to your lab

### Postman Setup

Add the cookie domains to whitelist in cookies settings,  so that the cookies can be accessed programmatically

### gitlab token
To run sit sanity test that compares gitlab version with version that is deployed on SIT environment
you need to generate your own personal token.
* Go to https://gitlab.sales.sbx.zone/profile/personal_access_tokens
* Enter a name git-lab-token-for-running-sit-sanity
* Select 'api' scope
* Click on create personal access token
* Make a note of "Your New Personal Access Token" , its not shown when the page gets reloaded
* Replace "CHANGE-ME" in banking-co-stateless.postman_globals.json with actual token value(do not commit this file)

### Run all tests

```

$ node index.js --help

Options:
  --version   Show version number                                      [boolean]
  --lab       Run ingress test
                             [required] [choices: "savings", "banking", "loans"]
  --run       Run tests                               [boolean] [default: false]
  --ingress   Add service tests that run via ingress  [boolean] [default: false]
  --f5        Add f5 tests to check f5 scenarios      [boolean] [default: false]
  --ibauth    Add ibauth end to end tests             [boolean] [default: false]
  --sanity    Add sit sanity tests                    [boolean] [default: false]
  --help, -h  Show help                                                [boolean]


```



HTML reports will be generated in the outputs/ folder. 