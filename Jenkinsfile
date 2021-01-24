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
        kubeconfig(credentialsId: 'jenkins_kubernetes', serverUrl: 'http://192.168.99.100:8443/', caCertificate: '-----BEGIN RSA PRIVATE KEY----- MIIEogIBAAKCAQEApUv+Pj5L1/xFlVghALIkrDcCwgCXRU21i00zOHR7Y/zpIb+P T4Fbx0jym7rWD8XjdHpel8gTyoJkDPXdrHcTuzxiBj29n/9XJLFlQ4i8yzmE/v40 VF0eo86yRzzf+bgDwnSsymHvpU2ne70/km69qqThcZyEKj51MTmlqvsdD8OLl6Z1 tPJXwhT/vQApcc2/5jxT09grW77xMn8IZRgCDN8wrZGIwz2nLg9mhZwvz3yUXA0D Xl6CI8OpQVZhdTFjedcmQMZrWl/GEsYS+rJn/yZX4H9rNWJoXtOyWEiuALajSrEf LCPxHhq2Tplfu8PXGp+ePLkzBfVtMD4a086YawIDAQABAoIBAF6G1L/3lBvR0mET YtwpA7vQQa179QXW6Kje3xm70wxdB10bVPMcgMW4O7U+5Udj3S0xBYM7EcZPRrP6 rmgAOLJsV4pGKHik5sq+/6/dNEnrfNjtujM8hVcbzuvaLiN6TfwYCPA7jXY0sECc +wvcdG5vl9UGsrYNvasG0myy6e2m9CzIDzMxzooHmbz1MzhmNDXlWou9cxKEoy94 ZSqSwOCmW+RYqFpDnO2bOnz08GcM9/hXLY3OMm7Cor7g0g/FFPw36J9FXqeMFhht GHnN+GttFc3RlTmtKWRl0Oym1Qk80D1ZopRSTUVDiuX0ZJKKAmkGlZ115rCeZn8U qNvv1DECgYEA2mAJ1WWSCpsz4LObNYbRNxqFpX3sSYnzbeHmDt5WQ0XCWD9JnhJJ IcuDGQlD2tZSJp4eRPX4rXvZGOSZROnAMMYpbuzGCoB8MYCHQgGlgDxD1EJUaKce FlNskicubdAWbgTuEfXqX24pTtwE325G1gFZLzsminzkXJCg387Fws0CgYEAwcbO 9+lmp91FZal8OwOprJL7Io8UnVzbFsLSrQem9YXbjdzBqXO2KZmFLzl9hcIPZkmc rkfbr32SjBbupCEpqX34PyekpJPsleuVG98zOU9aq8MqyMX2KBfzCUdNzBFpIQ12 4Fyl8oWZ1XBDMusfY+d5BGgFy48/cAYz+GOieBcCgYA2Be5I2ZDQiObDnws1qb2W STxo3YcYBkWvmGQGp6BlkhtrI3T94v4umx86kV01BTJblWBdpRA5MttZWixErSM7 rbpQU8kGjhSrVmWfwbKEz+Pj3ejt3vIFievhGEpXJlR2MUgIL3Mk2qbjeHDIKYri pIDAu3xkZFNGRw1VcNzhvQKBgFrjN+JZ7BdiFpG3bBh2AFh8XCR6fc3NZsmHOa+E vk+8qB0i5QboyhE6+5gJ3BEn03dDoaSw+Z6XRGxGuUnscBEaj5x3qKa05yvuYnK/ PtRrnvifQusGxw1JJmo8soW7yNaC7TYQ3pkhBuVwkWRJmeCPClkBvW4b00Jk9m1T tjmjAoGAUWPWS7o05vMdNW37aEB/1g0tQ9XbTgwRDH8rOgUQuAjZRH/EJWXOBtxo g99hbjLz4LED6POD+z4WntcPLYwwS0WGojp9SZP+m6vIRocG+CDvuRT9N7urMvKZ Uy11L9JC7OiQdH62xCAwrzXbN9FuFQMFLZWT/hH/LknPNgApdeM= -----END RSA PRIVATE KEY-----') {
          sh '''kubectl rollout restart deployment tcc-web-deployment 
'''
        }

      }
    }

  }
}