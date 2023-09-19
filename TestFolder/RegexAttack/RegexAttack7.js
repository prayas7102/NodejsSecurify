try {
    const text = "Visit my website at https://example.com and http://test.com";
    const regex = /(a|a?)+/;
    const urls = text.match(regex);
    console.log(urls);
} catch (error) {
    console.log(error)
}