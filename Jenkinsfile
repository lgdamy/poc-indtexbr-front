pipeline {
  agent {
    dockerfile {
      filename 'DockerFile'
    }

  }
  stages {
    stage('Build Image') {
      steps {
        sh 'docker build -t tcc_front .'
      }
    }

    stage('Tag Image') {
      steps {
        sh 'docker tag tcc_front:latest srochg/tcc_front'
      }
    }

    stage('Push Image') {
      steps {
        sh 'docker push srochg/tcc_front:latest'
      }
    }

  }
}