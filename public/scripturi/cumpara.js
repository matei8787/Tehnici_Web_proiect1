const PUBLIC_STRIPE_KEY = 'pk_test_51KPDshJoqxHUT3I8i4QpsNWzH43cHpOWAUrMWHjC10j1MgCONOIw2E3rvZ8KNyeRCQpMtzf0t3kUfF1GjSkuJolq00tAzQjea7' 
const stripe = Stripe(PUBLIC_STRIPE_KEY)


async function main()
{
    const fetchClientSecret  = async () => {
        const res = await fetch("/cumpara", {
            method: "POST",
        });
        const {clientSecret} = await res.json()
        return clientSecret;
    };
    const checkout = await stripe.initEmbeddedCheckout({
        fetchClientSecret,
    });


    checkout.mount('#div-form-cumpara');

    
}

window.onload = main