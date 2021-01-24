pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'docker build -t tcc_front .'
      }
    }

    stage('tag') {
      steps {
        sh 'docker tag tcc_front:latest srochg/tcc_front'
      }
    }

    stage('push') {
      steps {
        sh 'docker push srochg/tcc_front:latest'
      }
    }

    stage('apply') {
      steps {
        sh '''kubectl rollout restart deployment tcc-web-deployment 
'''
      }
    }

  }
}