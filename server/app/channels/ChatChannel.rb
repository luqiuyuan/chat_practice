class ChatChannel < ApplicationCable::Channel

    def subscribed
        puts "ping, subscribed"

        stream_from "room_#{params[:room]}"
    end

    def unsubscribed
        puts "pong, unsubscribed"
    end

    def send_message(data)
        puts "send message: " + data.to_s

        ActionCable.server.broadcast "room_#{params[:room]}", content: data['content']
    end

end
