require 'stream_rails'

StreamRails.configure do |config|
  config.api_key      = "rmw98nzey9p8"
  config.api_secret   = "jc9wc5gpb642bjmqv6ptbacckhf6nagpptuf3p5peeksa3sqywxy88npz7cxna5u"
  config.timeout      = 30                  # Optional, defaults to 3
  config.location     = 'us-east'           # Optional, defaults to 'us-east'
  config.api_hostname = 'stream-io-api.com' # Optional, defaults to 'stream-io-api.com'
  # If you use custom feed names, e.g.: timeline_flat, timeline_aggregated,
  # use this, otherwise omit:
  # config.news_feeds = { flat: "timeline_flat", aggregated: "timeline_aggregated" }
  # # Point to the notifications feed group providing the name, omit if you don't
  # # have a notifications feed
  # config.notification_feed = "notification"
end
