import 'reflect-metadata';

import {Application} from './application/application.js';
import {container} from './container.js';
import {Component} from './types/component.enum.js';

const application = container.get<Application>(
  Component.Application
);

application.init();