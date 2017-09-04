class Confidence{

    public static void main(String[] args){
	int n=50, d=96;
	double p = n/(double)d;
	double z = 1.96*Math.sqrt(p*(1-p)/d)+1.0/(2*d);

	double ul=p+z, ll=p-z;
	if (ul > 100) ul=100;
	if (ll < 0) ll=0;
	System.out.println("Upper interval limit: "+ul);
	System.out.println("Lower interval limit: "+ll);
    }
    
}
   