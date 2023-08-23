/**
* Jenkins Pipeline Script for deploying CF-Agent-Mobile to Expo platform
* @Author Ahmad Bilesanmi
* @Created August 7 2023
**/
pipeline{
    agent any

    tools {
        nodejs "NodeJS 16.20"
    }

    environment {
        EXPO_CLI_HOME = "${WORKSPACE}/expo-cli"
        PATH = "${EXPO_CLI_HOME}:${PATH}"
    }

    stages{
        stage('Check Expo Installation'){
            environment {
                EAS_TOKEN = credentials('ExpoToken')
            }
            steps {
                script{
                        // Check node version
                        sh "node -v"
                        // Install dependencies
                        sh "npm install"

                        // Use the ExpoToken to log in
                        sh("eas login --non-interactive --username=medobills --token=$ExpoToken")
                        
                    }
                    
                }
            }
        
        stage('Build') {
            steps {
                echo "Building..."
                // Perform build steps
                sh "eas build --platform android --non-interactive"
                    
            }
        }

        stage('Save Build Artifact') {
            steps {
                script{
                sh '''
                    //Get the last android build url
                    buildUrl=$(eas build:list --json --platform=android --limit=1 --non-interactive | jq -r '.[0].artifacts.buildUrl')

                    // download build
                    wget "$buildUrl"

                    // get build name
                    parts=$buildUrl.split('/')
                    artifactName="${parts[-1]}"
                    echo "Retrieved file name is: $artifactName"

                    //check if the directory exists
                    directory_path="artifacts/dev"
                    if [ -d "$directory_path" ]; then
                        echo "Directory '$directory_path' exists"
                    else
                        echo "Directory '$directory_path' does not exist. Creating it now."
                        mkdir -p "$directory_path"
                    fi

                    //count number of files in the directory
                    file_count=$(find "$directory_path" -maxdepth 1 -type f | wc -l)

                    //Rename the file
                    version="${file_count + 1}"
                    mv "$artifactName" "artifacts/dev/agent-app-${version}.aab"

                    echo "AAB file is successfully saved"
                    echo "SUCCESS"
                '''
                }
                office365ConnectorSend webhookUrl: "${env.TEAM_WEBHOOK}", status: 'Success', message: "Agent AAB file created and saved successfully"

            }
        }
    }
}