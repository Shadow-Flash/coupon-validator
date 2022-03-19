# #!/bin/sh
echo "WARN: If you are running this application for the first time, then just run local first"
echo "Do you want to run it (local or production):"
PS3="Choose from above number:"

options=("Local" "Production")

select opt in "${options[@]}"

do
    case $opt in

        "Local")
            echo "You choose LOCAL run"

            until cd client && npm install
            do
                echo "local run stopped while running npm install"
                exit 0
            done

            until cd ../server && npm install && npm run dev
            do
                echo "local run stopped somehow"
                exit 0
            done

            exit 0
            ;;

        "Production")
            echo "You choose PRODUCTION run"

            until cd client && rm -rf "$PWD/build" && npm run build
            do
                echo "production step 1 stop somehow"
                exit 0
            done

            until rm -rf ../server/public && mkdir ../server/public && cp -f -r ./build/. ../server/public/.
            do
                echo "production step 2 stop somehow"
                exit 0
            done

            until cd ../server && npm run prod
            do
                echo "production step 3 stop somehow"
                exit 0
            done

            exit 0
            ;;

    esac
done