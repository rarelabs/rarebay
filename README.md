These files contain the frontend version of Rareaby. 
Below are some featues.
-TAP Game
-AMM Swap
-Horizon Effect

Do not install any other pkg to prevent additional bugs, we've tried to make the minimal to 5 bugs which are currrenty unpatchable:
Step 1: run npm i
Step 2: run npm run dev
Step 3: open: http:127.0.0.1:3000

Congratulations the app should be running, ignore the first error about token.address not being available, this is because in the swap, we set the first token to null by defualt to allow users to select a token of thei choice.
