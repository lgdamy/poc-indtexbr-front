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
        kubeconfig(serverUrl: 'http://192.168.99.100:8443', credentialsId: 'jenkins_kubernetes', caCertificate: '-----BEGIN CERTIFICATE----- MIIFszCCA5ugAwIBAgIUOo3BJ0d1UH8gp1FRs1qz14uazpUwDQYJKoZIhvcNAQEL BQAwaTELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMQowCAYDVQQHDAFPMQ4wDAYD VQQKDAVNeU9yZzEVMBMGA1UEAwwMbXlkb21haW4uY29tMRowGAYJKoZIhvcNAQkB Fgt0Y2NAdGNjLmNvbTAeFw0yMTAxMjUxNjU2MzVaFw0yMzExMTUxNjU2MzVaMGkx CzAJBgNVBAYTAlVTMQswCQYDVQQIDAJDQTEKMAgGA1UEBwwBTzEOMAwGA1UECgwF TXlPcmcxFTATBgNVBAMMDG15ZG9tYWluLmNvbTEaMBgGCSqGSIb3DQEJARYLdGNj QHRjYy5jb20wggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDDDfFFzzfx QhjgmpNFIRM5NLGk5l90v992Y/thFTgHzRWJGezGFBOfCEky13YtBWV6DTZIhRWa wjug0WN5E5PUPl+iRiIUEiEyW/X+uKUrO47sfLhdKQuvehho0uha777jLDwMnued IaN/2/3OAlqSUbvpf0QWadFmKYdWy0jFLkd4UioJH1kcEi+hPEas2QpEyJ3u0ZD9 alegxHzQ+muIL8Ka0XCa/maarbyzQVyqfSoLFymfqb8vWBseT0zGgxZ4fMIwplTW nQ8D21ezVaheI4YtSLnAkD0KlfNjXhAl9ZoVcBMPYfm1FFUpZM8Hef3L/SR0LXdK Ln80c1Wg8zJMU0sgfA+YlxxPEKQQ8hN+6GAx+o/sZ2102ntTwQnJQuNCjTxkdClX cfV5BI/uWK0YeLAlKft/wjLnFTLyydu6xYY4y5K3Ehn4/Z7qQrzbpzWDC5PO9WBU xClAu36Nu4DCcM858rLP1tqh+y+sM9kOTYkE1ZWhIOTAT17G07+zZhofG1dNasTo GUUZ1a8V8vrqubDWeZ/L/2shcrEtQgvAcXb8uLTpBMX/TYX86S9lDbJSXsYD33+W A1Oblt+B1fjtYpYsbbcrvfpTcH8791y75hH/H58YPSDGreb1aoeXP3nGTdH0kSq7 tsB0XiqPeHqmFazijuXSvqje6NwneXRzswIDAQABo1MwUTAdBgNVHQ4EFgQURbXZ x87zTua7RcY+GcHjITTkOzswHwYDVR0jBBgwFoAURbXZx87zTua7RcY+GcHjITTk OzswDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAgEARVFVzpLJxyOK ny47sDRRqclWpR1uX9/h3YCk70FT91Iqo+B/go9OVvkV+yZ/rWNkxWBSHJ0D+Fab Vk2w5C5Qs9yRXrboN+B52DhmVkwW7Oxe/0/x7vilVPPi/2q8FhMEZE8xJMPl5cMo WzB8zpfXqYPdSqHCN5hYD29iuv54AxrnMMvLD6IB1Vr7bVfl6qzwxKcfU5XftWPa Tlju/dhzQPH/J2ENbecBFL6wkfwM0BoKexxiJKK3DdXHMNRegkkATF4MgxdTBoxF CCytyoHNloo58pIsvq5EG953dRJA0ksKyNfe/rbHtYcblJHijbI+4TB8RiU32dcc KnQDVGuMMLah4VonqP3UfuxXYK8ELpqCIhWrH7vsf8npGQHnLYbuxVaXmmB/kvDf 61sz6O0iE+nj9RlhjSllHk+jvVbm7FLhVg5zsSL+E/0PYcK6SVLduLkilpnGIgLC HMJN1lBLOWjEod717VMFjIF2p8y+5X6FlsGhHQYRNM4Q4PW9HuovOIEiHP3X8s8Q O8S4F7oURvZxMhYLWUA8ExnV877g4J71iw8G2l5HGsyD1J9oOxgpKtXHqEf35z/N M4HpizHbKDv+LHTIHiYprNFnzwjDEGdh5lXeyk1R5u88WoHne6nxsJWBRpfHDGC7 6t9SCi6sRSUagsT782F5QvvQvorZfQE= -----END CERTIFICATE-----') {
          sh 'kubectl rollout restart deployment tcc-web-deployment '
        }

      }
    }

  }
}