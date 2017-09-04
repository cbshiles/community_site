import java.util.*;  
class Fudge{

    static int[][] percentToMrss =
    {{50, 411},
     {51, 411},
     {52, 410},
     {53, 410},
     {54, 409},
     {55, 407},
     {56, 405},
     {57, 403},
     {58, 401},
     {59, 398},
     {60, 395},
     {61, 392},
     {62, 388},
     {63, 384},
     {64, 380},
     {65, 376},
     {66, 371},
     {67, 366},
     {68, 360},
     {69, 354},
     {70, 348},
     {71, 342},
     {72, 335},
     {73, 328},
     {74, 321},
     {75, 313},
     {76, 305},
     {77, 296},
     {78, 288},
     {79, 279},
     {80, 270},
     {81, 260},
     {82, 250},
     {83, 240},
     {84, 229},
     {85, 219},
     {86, 207},
     {87, 196},
     {88, 184},
     {89, 172},
     {90, 159},
     {91, 147},
     {92, 134},
     {93, 120},
     {94, 106},
     {95, 100}};


    public enum PayerType {
	COMMERICAL, MEDICARE, MEDICAID
    }

    public static int getMrss(String measure, PayerType pt, Integer rate){

	if (rate == null){
	    //use 1st table (need to look here anyways b/c may be n/a)
	} else {
	    return rm.lookup(rate);
	}
    }
    
    public static  class RateMapper {
	int min, max;
	HashMap<Integer,Integer> map;
	public RateMapper(int[][] data, int min, int max){
	    this.max = max;
	    this.min = min;
	    map = new HashMap<Integer,Integer>();
	    for (int[] pair: data){
		map.put(pair[0], pair[1]);
	    }
	}

	public int lookup(int rate){
	    if (rate < min) rate = min;
	    else if (rate > max) rate = max;
	    return map.get(rate);
	}
    }

    public static RateMapper rm;
    public static void main(String[] args){
	rm = new RateMapper(percentToMrss, 50 , 95);
	System.out.println(rm.lookup(3));
	System.out.println(rm.lookup(67));
	System.out.println(rm.lookup(99));
    }

    
}
   