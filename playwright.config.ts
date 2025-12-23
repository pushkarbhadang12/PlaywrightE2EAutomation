import {PlaywrightTestConfig} from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({path: path.resolve(__dirname, '.env')});

require('dotenv').config({ override: true });

const config: PlaywrightTestConfig = {
  projects: [
    
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',       
      },
      
    },  
    // {
    //   name: 'firefox',
    //   use: {browserName: 'firefox'},
    // },
    // {
    //   name: 'webkit',
    //   use: {browserName: 'webkit'},
    // },
  ],
  
  timeout: 30000,
  
  //retries: 2,

  //fullyParallel: true,
  
  reporter: [['html', {open: 'always'}]],
  
  use: {
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
  },

  testMatch: '**/*.spec.ts',

  //repeatEach: 2,

};

export default config;