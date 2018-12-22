	public enum Status { PASS, FAIL, NOTDONE };
	
	public class TimeSpan {
		
		/*
		 * This is a period of time in which we are checking for continuous enrollment. (Normally a year)
		 * Need to prevent Me's that have a start before their end, or null for either variable
		 */
		
		LocalDate start, end, lastFinish;
		int gapCount, maxGaps, maxDaysInGap;
		
		public TimeSpan (LocalDate s, LocalDate e, int maxGaps, int maxDaysInGap){
			start = s;
			end = e;
			lastFinish = null;
			gapCount = 0;
			
			maxGaps = this.maxGaps;
			maxDaysInGap = this.maxDaysInGap;
		}
		
		//minDaysInGap is the minimum # of days a gap must be to be included in the TimeSpan's gapCount
		//returns true is gap does not cause a fail
		public boolean gapOkay(LocalDate a, LocalDate b, int minDaysInGap){
			long daysInGap = ChronoUnit.DAYS.between(a, b);
			if (daysInGap > minDaysInGap && (daysInGap >  maxDaysInGap || ++gapCount > maxGaps))
				return false;
			else
				return true;
		}
		
		public Status addEnrollment (MembershipEnrollment me){

			//irrelevant enrollment
			if (me.getFinishDate().isBefore(start))
				return Status.NOTDONE; 
			
			//enrollment starting after current time span
			if (me.getStartDate().isAfter(end)){
				if (lastFinish == null) {
					return Status.FAIL;
				} else {
					if (! gapOkay(lastFinish, end, 0)) return Status.FAIL;						
				}
				return Status.PASS;
			}
			
			if (lastFinish == null){			
				if (! gapOkay(start, me.getStartDate(), 0)) return Status.FAIL;
				lastFinish = me.getFinishDate();			
			} else {	
				if (! gapOkay(lastFinish, me.getStartDate(), 1)) return Status.FAIL;
				if (me.getFinishDate().isAfter(lastFinish)) {
					lastFinish = me.getFinishDate();
				}	
			}
			
			if (lastFinish.isAfter(end)) {
				return Status.PASS;
			} else {
				return Status.NOTDONE;
			}
		}
		
		public boolean close(){ //return true if passed
			if (lastFinish == null)
				return false;
			return gapOkay(lastFinish, end, 0);	
		}
	}
	
	public List<TimeSpan> makeYearList(LocalDate beg, LocalDate end, int maxGaps, int maxDaysInGap){
		List<TimeSpan> years = new ArrayList<TimeSpan>();
		LocalDate eoy;
		while (beg.isBefore(end)){
			eoy = beg.plusYears(1).minusDays(1);
			
			if (eoy.isAfter(end))
				eoy = end;
						
			years.add(new TimeSpan(beg, eoy, 1, 45));
			beg = eoy.plusDays(1);
		}
		return years;
	}
	
	public boolean check7(List<MembershipEnrollment> mes, LocalDate beg, LocalDate end){

		List<TimeSpan> years = makeYearList(beg, end, 1, 45);
		
		int yi=0, mi=0;
		while (yi < years.size()){
			if (mi >= mes.size()){
				return yi == years.size()-1 && years.get(yi).close();
			}
			
			switch (years.get(yi).addEnrollment(mes.get(mi))) {
			case PASS:
				yi++;
				break;
			case FAIL:
				return false;
			default:
				mi++;
			}
		}
		return true;
	}   