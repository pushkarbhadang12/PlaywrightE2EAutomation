import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({path: path.resolve(__dirname, '.env')});

require('dotenv').config({ override: true });

export const STORAGE_STATE = path.join(__dirname, '/tests/state.json');

export default defineConfig({

  projects: [
    
    {
      name: 'setup',
      testMatch: '**/tests/*.setup.ts',
      use: {
        browserName: 'chromium',              
      }
    },

    {
      name: 'e2e tests',
      dependencies: ['setup'],
      testMatch: '**/tests/*.spec.ts',
      use: {
        browserName: 'chromium',   
        storageState: STORAGE_STATE,    
      }      
    }, 
    
    {
      name: 'teardown',
      dependencies: ['e2e tests'],
      testMatch: '**/tests/*.teardown.ts',
      use: {
        browserName: 'chromium',              
        storageState: STORAGE_STATE,    
      }      
    }
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

  workers: 1
});

