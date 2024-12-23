import axios from "axios";
import fs from "fs/promises"; // Promises-based fs for cleaner async handling

const getImageHf = async (data) => {
    const headers = {
        Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        "Content-Type": "application/json",
    };

    const outputPath = `./public/${Date.now()}.png`;
    console.log("api",process.env.HUGGING_FACE_API)

    try {
        const response = await axios.post(process.env.HUGGING_FACE_API, data, {
            headers,
            responseType: "arraybuffer", // Directly handle binary data
        });

        // Save the file
        await fs.writeFile(outputPath, response.data);

        // Return the path if saved successfully
        console.log("Image saved successfully at:", outputPath);
        return outputPath;
    } catch (error) {
        console.error("Error processing the image:", error.message);
        throw new Error("Failed to process and save the image.");
    }
};

export default getImageHf;
