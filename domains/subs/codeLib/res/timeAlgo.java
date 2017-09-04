	public static boolean check(List<MembershipEnrollment> mem, LocalDate soy, int years, int maxGaps){
		
		/* The Parameters:
		 *   mem - should be enrollments for one memId & ordered by ascending startDate
		 *   soy - first day of first year in which we are checking for continuous enrollment
		 *   years - # of years to check for continuous enrollment, assumed to be contiguous
		 *   maxGaps - max # of gaps in a year, the max size of a single gap is assumed to be 45 days
		 */

	    LocalDate firstStart = null, lastEnd = null, snoy = soy.plusYears(1);
	    int gaps=0;
	    long dbw;
		// what if a year wasn't closed & the new me starts in the next year?

		for (MembershipEnrollment me : mem) {
			if (me.getStartDate() != null && me.getFinishDate() != null) {
				System.out.println("start loop: " + me);
				while (me.getStartDate().compareTo(snoy) >= 0) {

					// close last year
					if (lastEnd == null)
						return false;
					dbw = ChronoUnit.DAYS.between(lastEnd, snoy);
					if (dbw > 1 && (dbw > 45 || ++gaps > maxGaps))
						return false;
					// else you passed the year!

					// update year
					if (--years > 0) {
						soy = snoy;
						snoy = soy.plusYears(1);
						gaps = 0;
					} else
						return true;
					firstStart = lastEnd = null;
				}

				if (firstStart == null) { // first enrollment that affects this
											// year
					if (me.getFinishDate().compareTo(soy) >= 0) {
						if (me.getStartDate().compareTo(soy) <= 0) {
							firstStart = soy;
						} else {
							dbw = ChronoUnit.DAYS.between(soy, me.getStartDate());
							if (dbw > 0 && (dbw > 45 || ++gaps > maxGaps))
								return false;
							firstStart = me.getStartDate();
						}
						lastEnd = me.getFinishDate();
						System.out.println(firstStart + " " + lastEnd);
					}
				} else {// not the first enrollment of the year

					if (me.getStartDate().compareTo(lastEnd) > 0) {

						dbw = ChronoUnit.DAYS.between(lastEnd, me.getStartDate());
						if (dbw > 1 && (dbw > 45 || ++gaps > maxGaps))
							return false;
					}

					if (me.getFinishDate().compareTo(lastEnd) > 0) {

						lastEnd = me.getFinishDate();
					}
				}

				while (lastEnd.compareTo(snoy.minusDays(1)) >= 0) {// edge
																	// case??

					if (--years > 0) {
						soy = snoy;
						snoy = soy.plusYears(1);
						// firstStart = soy;
						gaps = 0;
					} else
						return true;

				}
			}
		}
		
		dbw = ChronoUnit.DAYS.between(lastEnd, snoy.minusDays(1));
		if ((dbw > 0 && (dbw > 45 || ++gaps > maxGaps)) || years > 1)
			return false;
		else
			return true;
	}   