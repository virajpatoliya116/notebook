#!/usr/bin/env groovy

pipeline {
    agent any
    stages {
 
        stage('build') {

            steps {
                script{
                    echo 'building the application'
                    sh "docker build -t viraj116/exam:examimage ."
                    sh "docker run -it -d -p 3000:3000 viraj116/exam:examimage"

                }
            }
        }
       
        stage('deploy') {
//            input{
//                message "Select the environment to deploy"
//                ok "done"
//                parameters{
//                    choice(name: 'Type', choices:['Dev','Test','Deploy'], description: '')
//                }
//
//            }
            steps {
                script{echo 'deploying the application'
                    withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]){
                        sh "echo ${PASSWORD} | docker login -u ${USERNAME} --password-stdin"
                        sh "docker push viraj116/exam:examimage"
                    }}

            }
        }
//        stage('commit version update'){
//            steps{
//                script{
//                    withCredentials([usernamePassword(credentialsId: 'git-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]){
//                        sh 'git config --global user.email "jenkins@example.com"'
//                        sh 'git config --global user.name "jenkins"'
//
//                        sh 'git status'
//                        sh 'git branch'
//                        sh 'git config --list'
//
//                        sh "git remote set-url origin https://${USERNAME}:${PASSWORD}@github.com/bhoomildayani182/springboot-jenkins.git"
//                        sh 'git add .'
//                        sh 'git commit -m "version change"'
//                        sh 'git push origin HEAD:jenkins-jobs'
//                    }
//                }
//            }
//        }
    }
    post{
        always{
            echo 'Executing always...'
        }
        success{
            echo 'Executing success'
        }
        failure{
            echo 'Executing failure'
        }
    }
}
