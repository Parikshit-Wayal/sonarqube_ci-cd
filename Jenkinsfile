pipeline {
    agent any

    environment {
        SONARQUBE_SERVER   = 'SonarQube'
        SONAR_SCANNER_NAME = 'SonarScanner'
        SONAR_PROJECT_KEY  = 'simple-node-ci'

        EMAIL_RECIPIENTS = 'parikshitwayal3@gmail.com'
        DOCKER_IMAGE     = "simple-node-ci:${BUILD_NUMBER}"
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

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }
    }

    post {
        success {
            emailext(
                subject: "✅ SUCCESS: Jenkins Build #${BUILD_NUMBER}",
                body: """
CI Pipeline SUCCESS

Job: ${JOB_NAME}
Build: ${BUILD_NUMBER}
Docker Image: ${DOCKER_IMAGE}
""",
                to: "${EMAIL_RECIPIENTS}"
            )
        }

        failure {
            emailext(
                subject: "❌ FAILURE: Jenkins Build #${BUILD_NUMBER}",
                body: """
CI Pipeline FAILED

Job: ${JOB_NAME}
Build: ${BUILD_NUMBER}
""",
                to: "${EMAIL_RECIPIENTS}"
            )
        }
    }
}

