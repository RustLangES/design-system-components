import { setupShowcase } from "@rustlanges/showcase/vue";
import * as icons from "../lib/icons";

import "@rustlanges/showcase/styles.css";
import "./styles.css";

import * as showcases from "../lib/showcases";

setupShowcase({
  showcases,
  icons,
});
