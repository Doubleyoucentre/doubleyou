import {defineConfig} from '@playwright/test'
export default defineConfig({testDir:'./tests/browser',workers:1,timeout:45000,outputDir:'.local-audit/browser-results',reporter:'list',use:{baseURL:'http://127.0.0.1:5211',channel:'chrome',headless:true},webServer:{command:'npm run dev -- --host 127.0.0.1 --port 5211 --strictPort',url:'http://127.0.0.1:5211',reuseExistingServer:false}})
