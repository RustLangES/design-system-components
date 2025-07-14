#!/usr/bin/env nu

use ./labels.nu
use ./graphql.nu
use ./figma.nu
use ./dotenv.nu

def "query parsed issues" [] {
  graphql send query issues
  | update bodyText {lines | skip 5 | parse " {tech} - {component}"}
  | insert tech {get bodyText.tech.0}
  | update bodyText {get component}
  | rename --column {bodyText:components}
  | move components --after tech
}

def main [] {
  dotenv load | load-env

  query parsed issues
}
