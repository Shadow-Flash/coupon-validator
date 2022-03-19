# Coupon-Validator

## Versions to use: 
  - Node: 17.7.2 or 14.18.2
  - npm: 8.5.2 or 6.14.15

## Steps to run Local:
  1. Just run the below command from the root directory (coupon-validator).
      ```bash
      bash scripts/build.sh
      ```
  2. Choose 'Local' from the option.
      ```bash
      WARN: If you are running this application for the first time, then just run local first
      Do you want to run it (local or production):
      1) Local
      2) Production
      Choose from above number:1
      ```
  3. Now, it will handle all by itself.
  
  ### Don't want to use bash:
  1. change the directory into client (coupon-validator/client)
  2. Run below command
      ```bash
      npm install && cd ../server && npm install
      ```
  3. Now run dev from (coupon-validator/server)
      ```bash
      npm run dev
      ```

## Steps to run Production:
  1. Just run the below command from the root directory (coupon-validator).
      ```bash
      bash scripts/build.sh
      ```
  2. Choose 'Production' from the option.
      ```bash
      WARN: If you are running this application for the first time, then just run local first
      Do you want to run it (local or production):
      1) Local
      2) Production
      Choose from above number:2
      ```
  3. Now, it will handle all by itself.
  
  ### Don't want to use bash:
  1. change the directory into client (coupon-validator/client)
  2. Run below command
      ```bash
      npm run build && cp -f -r ./build/. ../server/public/.
      ```
  3. Now run start from (coupon-validator/server)
      ```bash
      npm run start
      ```
