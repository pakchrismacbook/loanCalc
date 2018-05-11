// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
	e.preventDefault();
	document.getElementById('results').style.display = 'none';
	document.getElementById('loading').style.display = 'block';
	setTimeout(calculateResults, 1500);
});

function calculateResults(){
	// ui vars
	const
	amount = document.getElementById('amount'),
	interest = document.getElementById('interest'),
	years = document.getElementById('years'),
	monthlyPayment = document.getElementById('monthly-payment'),
	totalPayment = document.getElementById('total-payment'),
	totalInterest = document.getElementById('total-interest'),
	
	principal = parseFloat(amount.value),
	calculatedInterest = parseFloat(interest.value)/100/12,
	calculatedPayments = parseFloat(years.value)*12,

	// compute monthly payments
	x = Math.pow(1+calculatedInterest, calculatedPayments),
	monthly = (principal*x*calculatedInterest)/(x-1)
	;

	if(isFinite(monthly)){
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly*calculatedPayments).toFixed(2);
		totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
		document.getElementById('results').style.display = 'block';
		document.getElementById('loading').style.display = 'none';
	} else {
		showError('Please check your values')
	}
}
function showError(error){
	// hide results and loader
	document.getElementById('results').style.display = 'none';
	document.getElementById('loading').style.display = 'none';
	const errorDiv = document.createElement('div');
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');
	errorDiv.className = 'alert alert-danger';
	errorDiv.appendChild(document.createTextNode(error));
	card.insertBefore(errorDiv,heading);
	// clear error after 2 secs
	setTimeout(clearError, 2000);
}
function clearError(){ document.querySelector('.alert').remove() }