pipeline {
    agent any

    environment {
        // SonarQube configuration (from Jenkins Global Config)
        SONARQUBE_SERVER   = 'SonarQube'
        SONAR_SCANNER_NAME = 'SonarScanner'
        SONAR_PROJECT_KEY  = 'simple-node-ci'

        // Email & Docker configuration
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
            mail(
                to: "${EMAIL_RECIPIENTS}",
                subject: "✅ SUCCESS: Jenkins Build #${BUILD_NUMBER}",
                body: """
CI Pipeline SUCCESS

Job Name     : ${JOB_NAME}
Build Number : ${BUILD_NUMBER}
Status       : SUCCESS
Docker Image : ${DOCKER_IMAGE}

Regards,
Jenkins CI
"""
            )
        }

        failure {
            mail(
                to: "${EMAIL_RECIPIENTS}",
                subject: "❌ FAILURE: Jenkins Build #${BUILD_NUMBER}",
                body: """
CI Pipeline FAILED

Job Name     : ${JOB_NAME}
Build Number : ${BUILD_NUMBER}
Status       : FAILURE

Please check Jenkins console logs for details.

Regards,
Jenkins CI
"""
            )
        }

        aborted {
            mail(
                to: "${EMAIL_RECIPIENTS}",
                subject: "⚠️ ABORTED: Jenkins Build #${BUILD_NUMBER}",
                body: """
CI Pipeline ABORTED

Job Name     : ${JOB_NAME}
Build Number : ${BUILD_NUMBER}
Status       : ABORTED

Possible reason: Quality Gate failure or manual abort.

Regards,
Jenkins CI
"""
            )
        }
    }
}

