workflow "Build" {
  on = "push"
  resolves = ["npm publish"]
}

action "npm ci" {
  uses = "actions/npm@6309cd9"
  args = "ci"
}

action "npm lint" {
  uses = "actions/npm@6309cd9"
  args = "run lint"
  needs = ["npm ci"]
}

action "npm test" {
  uses = "actions/npm@6309cd9"
  needs = ["npm lint"]
  args = "test"
}

action "filter tags" {
  uses = "actions/bin/filter@e96fd9a"
  needs = ["npm test"]
  args = "tag"
}

action "npm publish" {
  uses = "actions/npm@6309cd9"
  needs = ["filter tags"]
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
