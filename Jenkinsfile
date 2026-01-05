pipeline {
    agent any

    environment {
        // Must match the "Name" in Manage Jenkins > System
        SONARQUBE_SERVER = 'SonarQube'
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
                    // Must match the "Name" in Manage Jenkins > Tools
                    def scannerHome = tool 'SonarScanner'
                    
                    withSonarQubeEnv("${SONARQUBE_SERVER}") {
                        // Use the full path to the scanner executable
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
                    // This satisfies the "Quality Gate enforcement" requirement
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}

//ok
