class ChatChannel < ApplicationCable::Channel

    def subscribed
        puts "ping, subscribed"

        stream_from "room_#{params[:room]}"
    end

    def send_message(data)
        puts "send message: " + data.to_s
    end

end
