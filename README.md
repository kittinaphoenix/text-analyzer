## Text Analysis App
The Text Analysis App is a web application that performs various text analysis tasks on user-provided input text. The app provides several options for analyzing the text, including classification, summary generation, sentiment analysis, sensitivity classification, and identification of key topics. The app utilizes a set of rules and endpoints to process the input text and generate the analysis results.

# Installation
The project includes Docker configuration files to simplify the setup and deployment process. Follow the instructions below to run the project using Docker.

## Prerequisites
Docker installed on your machine
# Steps
Clone the repository to your local machine.

Create an .env file based on the provided .env.template file.

cp .env.template .env

Open the .env file and replace YOUR_OPENAI_API_KEY with your actual OpenAI API key. Make sure to keep the .env file secure and avoid committing it to version control.

Build and start the Docker containers using Docker Compose.

docker-compose up

This command will build the Docker image and start the containerized application. The server will be accessible at http://localhost:4000.

# API Environment Configuration

The project relies on an API key for the OpenAI API. To configure the API environment, follow the steps below:

Obtain an API key from the OpenAI platform.

Create an .env file based on the provided .env.template file (if not done already).

Open the .env file and replace YOUR_OPENAI_API_KEY with your actual OpenAI API key. This file is used to set the environment variable openaikey when running the Docker containers.

Note: If you prefer to set the environment variable directly in your system's environment instead of using the .env file, make sure to set the openaikey environment variable before running the containers.

Start the Docker containers as described in the Docker Configuration section.

The application will now be able to access the OpenAI API using the provided API key.

# Usage
Upon accessing the Text Analysis App, you will see a user interface that allows you to configure the analysis options and provide input text for analysis. The app provides the following options:

Classification: Classifies the input text based on the topic it covers.
Summary: Generates a brief summary of the input text.
Sentiment Analysis: Analyzes the sentiment of the input text.
Sensitivity: Classifies the text based on its sensitivity.
Key Topics: Identifies the key topics in the input text.
For each option, you can enable or disable it using the corresponding checkbox. Each option is associated with a tooltip that provides additional information about its functionality.

After configuring the options and providing the input text, click the "Start Text/Document Analysis" button to initiate the analysis process. The app will display a progress bar indicating the progress of the analysis. Once the analysis is complete, the app will present the results in different panels, including classification, sentiment analysis, key topics, sensitivity, and summary.

# Contributing
Contributions to the Text Analysis App are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request on the GitHub repository.