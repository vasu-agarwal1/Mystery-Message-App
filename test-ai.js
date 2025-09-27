// Test file to verify the suggest-messages API
async function testSuggestMessages() {
  try {
    const response = await fetch('/api/suggest-messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('API Response:', data);

    if (data.success) {
      console.log('✅ Generated questions:');
      data.questions.forEach((q, i) => {
        console.log(`${i + 1}. ${q}`);
      });
    } else {
      console.error('❌ API Error:', data.error);
    }
  } catch (error) {
    console.error('❌ Network Error:', error);
  }
}

// Uncomment to test:
// testSuggestMessages();