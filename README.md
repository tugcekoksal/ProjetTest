# ProjetTest

## Description

Ce projet est une application ToDo complète avec un backend Django fournissant une API RESTful et un frontend React pour l'interface utilisateur. Elle permet aux utilisateurs de gérer leurs tâches quotidiennes avec des fonctionnalités d'ajout, de modification, de suppression, et de filtrage des tâches.

## Fonctionnalités

- Création de compte et authentification des utilisateurs.
- Ajout, modification, et suppression de tâches.
- Filtrage des tâches par statut (tous, actifs, complétés).
- Interface réactive adaptée aux différents types d'appareils.

## Prérequis

Ce que vous avez besoin pour installer le logiciel :

- [Python](https://www.python.org/downloads/)
- [Django](https://www.djangoproject.com/)
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [Git](https://git-scm.com/)

## Installation

### Backend (Django)

# Cloner le dépôt
git clone https://github.com/tugcekoksal/ProjetTest.git
cd ProjetTest

# Configurer le backend
*cd backend
*python -m venv env
*source env/bin/activate 
*pip install -r requirements.txt
*python manage.py migrate
*python manage.py runserver

# Dans un nouveau terminal, configurer le frontend
cd ../frontend
npm install  # ou `yarn install` si vous utilisez yarn
npm start    # ou `yarn start` pour démarrer l'application React

