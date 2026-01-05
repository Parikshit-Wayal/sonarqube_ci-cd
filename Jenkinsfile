pipeline {
    agent any
    
    environment {
        // These must match the "Name" fields in your Jenkins settings
        SONARQUBE_SERVER = 'SonarQube'
        SONAR_SCANNER_NAME = 'SonarScanner' 
        SONAR_PROJECT_KEY = 'nodejs_App'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // This command fetches the absolute path where Jenkins installed the scanner
                    def scannerHome = tool name: "${SONAR_SCANNER_NAME}"
                    
                    withSonarQubeEnv("${SONARQUBE_SERVER}") {
                        // Use the full path to the binary to avoid "command not found"
                        sh "${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                            -Dsonar.sources=. \
                            -Dsonar.language=js"
                    }
                }
            }
        }

        stage('Quality Gate Enforcement') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    // Required for your task: pipeline stops if SonarQube quality fails
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}

