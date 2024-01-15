### GPT key for testing
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

# Manual
Adding a chatbot based on GPT-3.5 to your website and deploying it on Heroku involves several steps. Here's a general guide to help you get started:

### Prerequisites:

1. **GPT-3.5 API Key:**
    - Obtain an API key for GPT-3.5 from OpenAI. You may need to sign up on the OpenAI platform and follow their instructions to get the API key.

2. **Heroku Account:**
    - Create an account on [Heroku](https://www.heroku.com/) if you don't have one.

### Steps:

1. **Create Your Chatbot Code:**
    - Write the code for your chatbot. You can use a web framework like Flask or Express.js, or even a simple HTML and JavaScript setup.

2. **Integrate GPT-3.5 API:**
    - In your code, integrate the GPT-3.5 API. You'll make HTTP requests to OpenAI's API endpoint using your API key. Refer to OpenAI's documentation for details on how to structure the API requests: [OpenAI API Docs](https://beta.openai.com/docs/)

3. **Store API Key Securely:**
    - Keep your API key secure. Do not expose it in your frontend code or public repositories. Consider using environment variables to store the key securely on Heroku.

4. **Test Locally:**
    - Test your chatbot locally to ensure that it works as expected. You can use tools like cURL or Postman to test API requests.

5. **Create a Git Repository:**
    - Initialize a git repository for your project if you haven't already.

6. **Set Up Heroku:**
    - Install the Heroku CLI and log in to your Heroku account using the `heroku login` command.

7. **Create a Heroku App:**
    - Run `heroku create` in your project directory to create a new Heroku app.

8. **Deploy Your App:**
    - Deploy your code to Heroku using `git push heroku master`.

9. **Configure Environment Variables on Heroku:**
    - Set your GPT-3.5 API key as an environment variable on Heroku using the `heroku config:set` command.

10. **Scale Your App:**
    - Optionally, scale your Heroku app based on your expected traffic using the `heroku ps:scale` command.

11. **Open Your App:**
    - Visit your deployed Heroku app to see your chatbot in action.

### Example (Flask Application):

Here's a basic example using Python and Flask. This assumes you have Flask installed (`pip install Flask`):

```python
from flask import Flask, request, render_template
import openai

app = Flask(__name__)

# Set your GPT-3.5 API key
openai.api_key = 'your_api_key_here'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.form['user_input']

    # Make a request to GPT-3.5 API
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=user_input,
        max_tokens=150
    )

    bot_response = response['choices'][0]['text']
    return render_template('index.html', user_input=user_input, bot_response=bot_response)

if __name__ == '__main__':
    app.run(debug=True)
```

In this example, you would have an HTML file (`templates/index.html`) to render the chat interface.

Remember to adapt the code to your specific use case and follow best practices for securing your API key and deploying web applications.
