const PUBLIC_STRIPE_KEY = 'pk_test_51KPDshJoqxHUT3I8i4QpsNWzH43cHpOWAUrMWHjC10j1MgCONOIw2E3rvZ8KNyeRCQpMtzf0t3kUfF1GjSkuJolq00tAzQjea7' 
const stript = Stripe(PUBLIC_STRIPE_KEY)

async function fetchConnectionToken()
{
    const res = await fetch('localhost:5000/cumpara', {method: 'POST'})
    const data = await res.json()
    return data.clientSecret;
}

function unexpectedDisconnect()
{
    alert("Ceva e nasol")
}


function main()
{
    const checkout = stripe.initEmbeddedCheckout({
        fetchConnectionToken,
    });

    console.log("Before Mounting")

    checkout.mount('#div-form-cumpara');

    console.log("After mounting")
}

main()