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

                        // echo "Loggin into EAS"
                        // // Use the ExpoToken to log in
                        sh('expo login --username=medobills --password=$EAS_TOKEN')
                        sh "eas whoami"
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

        stage('SonarQube Analysis'){
            steps {
                withSonarQubeEnv('Sonarqube'){
                sh "sonar-scanner \
                    -Dsonar.projectKey=cf-agent-mobile \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=${env.SONARQUBE_URL} \
                    -Dsonar.login=${env.AGENT_MOBILE_SONARQUBE_TOKEN} \
                    -Dsonar.exclusions='node_modules/**, coverage/**, **/tests/**' \
                    -Dsonar.dynamicAnalysis=reuseReports \
                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"
                }
            }
        }

        stage('Quality Gateway'){
            steps {
                timeout(time: 1, unit: 'HOURS'){
                    script {
                        def qualityGate = waitForQualityGate()
                        if (qualityGate.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qualityGate.status}"
                        }
                    }
                }
            }
            
        }

        stage('Save Build Artifact') {
            steps {
                script{
                sh '''
                    # Get the last android build url
                    buildUrl=$(eas build:list --json --platform=android --limit=1 --non-interactive | jq -r '.[0].artifacts.buildUrl')

                    # download build
                    wget "$buildUrl"

                    # get build name
                    echo "Getting Build name"
                    artifactName=$(echo "$buildUrl" | cut -d '/' -f 6)
                    echo "Retrieved file name is: $artifactName"

                    # check if the directory exists
                    directory_path="artifacts/dev"
                    if [ -d "$directory_path" ]; then
                        echo "Directory '$directory_path' exists"
                    else
                        echo "Directory '$directory_path' does not exist. Creating it now."
                        mkdir -p "$directory_path"
                    fi

                    # count number of files in the directory
                    file_count=$(find "$directory_path" -maxdepth 1 -type f | wc -l)

                    # Rename the file
                    version=$((file_count + 1))
                    mv "$artifactName" "artifacts/dev/agent-app-${version}.aab"

                    echo "AAB file is successfully saved"
                    echo "SUCCESS"
                '''
                }
                slackSend color: "#186b03", message: "Pipeline ${env.JOB_NAME} built and saved the AAB file successfully"

            }
        }
    }
}