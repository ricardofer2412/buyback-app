zip -r $1.zip ./*
echo Deploying Lambda $1
aws lambda update-function-code --function-name $1 --zip-file fileb://./$1.zip
