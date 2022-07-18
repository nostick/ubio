# Notes about the tests

- Since i'm using the same route with optional arguments,
  i'll be testing the specs regarding, route GET / and GET /:group on same file
  which is `get-instance-route.spec.ts`


- Probably the best thing to do is to create an ErrorHandler or something to catch and format
  errors to make them more readable and usable, for now just returning the error that happens,
  with a super basic catch to recognize the error.


- There is a test case on challenge that says
`- groups containing 0 instances should not be returned`.
This is being filtered by the aggregation framework when we get the instances from mongo on GET endpoint
but i don't think this case is actually possible to recreate since i'm using a single collection
with instances and then grouping them by group key, so if there is not any instance, then neither the
group or instance id would exists in collection, so that's why i'm not creating a test for that, basically
no possible to recreate with this DB data model.


- I'm aware there are only integration tests, and it's required to have mongo running locally
to make tests work, either by Docker or local server, i was able to achieve 100% coverage with those tests,
so i've got a good probe that code is behaving as i'm expecting at all points, also i wanted to keep it
simple and don't expend to much time on this part.

