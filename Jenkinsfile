pipeline {
    agent any

    environment {
        // Must match Jenkins Global Tool / SonarQube config names
        SONARQUBE_SERVER   = 'SonarQube'
        SONAR_SCANNER_NAME = 'SonarScanner'
        SONAR_PROJECT_KEY  = 'nodejs_App'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Resolve SonarScanner installation path from Jenkins tools
                    def scannerHome = tool name: "${SONAR_SCANNER_NAME}"

                    withSonarQubeEnv("${SONARQUBE_SERVER}") {
                        sh """
                        ${scannerHome}/bin/sonar-scanner \
                          -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                          -Dsonar.sources=. \
                          -Dsonar.language=js
                        """
                    }
                }
            }
        }

        stage('Quality Gate Enforcement') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}

