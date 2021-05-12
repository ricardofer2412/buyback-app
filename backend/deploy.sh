mv ./expressApp/node_modules /tmp/node_modules
scp -r -i emailBE.pem expressApp ec2-user@18.204.212.160:~/
 
 mv /tmp/node_modules ./expressApp/node_modules