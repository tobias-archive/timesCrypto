# timesCrypto
This was created as a project for the [Times Open Day Hackathon](http://open.blogs.nytimes.com/2014/12/19/timesopen-hack-day-2014/) called timesCrypto, a small app that encrypts and decrypts messages based on New York Times articles or to be more specific, the abstract for the articles.

**How it works**

The basic cryptosytem for timesCrypto is the [keystream](http://en.wikipedia.org/wiki/Keystream) method. Using the New York Times API I pull the most read stories' abstracts, glue them together, and use that as the key for the meassage that's being encypyted.

I use the passphase to determine which order the abstracts should be in., by taking each letter in the passphase, coverting it to a number, using the natural order in which the API pulls the feed and rearranging them based on converted passphase.

So for example:

Is my passsphase was "passport", it would look "p" = 15, "a" = 0, "s" = 18 and so on...

Then I would order the abstracts starting with the article and the 15th position, the article in the 1st postion, the article in the 18th position, etc.

Finally, since the feed is updated regularly, then the article order would change. In that way, it's best to decrypt the message in a timely manner, since a change in the article order would render the passphase useless and the message forever encrypted.

Check out the [demo](http://www.tobiaswright.com/timesCrypto/)