class ChatChannel < ApplicationCable::Channel

    def subscribed
        puts "ping, subscribed"
    end

end
