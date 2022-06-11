import { Configuration, OpenAIApi } from "openai"


async function validateApiKey(apiKey) {

    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
        });
        console.log("result" + completion.data.choices[0].text)
    } catch (error) {
        console.log('False')
        return false;
    }
    return true
}

async function generateTitles(apiKey, keywords) {
    // return "-Car vs. Motorcycle: The Pros and Cons "
    // return "-Car vs. Motorcycle: The Pros and Cons  -The debate of Car vs. Motorcycle: Which is better? -Advantages and disadvantages of Cars vs Motorcycles -Cars vs Motorcycles: A Comprehensive Comparison -The Pros and Cons of Cars and Motorcycles"
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: "Generate blog topics on: " + keywords + "\n\n 1.",
            temperature: 0.7,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        return completion.data.choices[0].text
    } catch (error) {
        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);
        } else {
            console.error(error)
        }
        return false
    }
}

async function generateDescriptions(apiKey, title) {
    // return "" +
    //     "1. many people debate whether cars or motorcycles are better. There are pros and cons to both. It really depends on what you are looking for in a vehicle. \n" +
    //     "2. Cars vs. motorcycles: which is better for you? It depends on your needs and preferences. Consider the pros and cons of each before making a decision. \n" +
    //     "3. Can't decide between a car and a motorcycle? Here's a helpful guide to help you make the best choice for you.Consider your needs and wants before making a decision. \n" +
    //     "4. Not sure if a car or motorcycle is right for you ? Here's a helpful guide to help you decide. Consider the pros and cons of each before making a final decision. \n" +
    //     "5. Car or motorcycle ? It's a tough choice, but we're here to help.Consider your needs and preferences before making a decision." +
    //     "6. Trying to decide between a car and a motorcycle ? Here are some things to consider before making your final decision." +
    //     "7. Still trying to decide if a car or motorcycle is right for you ? Check out this helpful guide to help you make the best decision for you."
    // 
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: "Generate blog meta descriptions on:" + title + "\n\n 1.",
            temperature: 0.7,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        console.log(completion.data.choices[0].text)
        return completion.data.choices[0].text

    } catch (error) {
        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);
        } else {
            console.error(error)
        }
        return false
    }
}

async function generateHeadings(apiKey, title) {
    // return "-Car vs. Motorcycle: The Pros and Cons  -The debate of Car vs. Motorcycle: Which is better? -Advantages and disadvantages of Cars vs Motorcycles -Cars vs Motorcycles: A Comprehensive Comparison -The Pros and Cons of Cars and Motorcycles"

    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: "Expand the blog title in to high level blog sections: " + title + " \n\n- Introduction: ",
            temperature: 0.7,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        console.log(completion.data.choices[0].text)
        return completion.data.choices[0].text

    } catch (error) {
        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);
        } else {
            console.error(error)
        }
        return false
    }
}

async function generateBlog(apiKey, heading, title) {
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: "For this blog that is about " + title + " Expand the blog section in to a detailed professional , witty and clever explanation. \n\n" + heading ,
            temperature: 0.7,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        console.log(completion.data.choices[0].text)
        return completion.data.choices[0].text
    } catch (error) {
        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);
        } else {
            console.error(error)
        }
        console.log("ERROR")
        return false
    }
}

export { validateApiKey, generateTitles, generateDescriptions, generateHeadings, generateBlog }