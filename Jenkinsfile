pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }

  }
  stages {
    stage('error') {
      steps {
        echo 'finish'
      }
    }

  }
  environment {
    t = 'tcc_web'
  }
}