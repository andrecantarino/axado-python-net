# -*- coding: utf-8 -*-

from datetime import datetime
from datetime import date
from time import mktime
from re import search


class Date:
    """ Classe utilitária para tratamento de datas e tempo """
    VALID_INSTANCES = (datetime, date)

    def __init__(self, date=None):

        if not date:
            self.__date = datetime.now()
        elif isinstance(date, self.VALID_INSTANCES):
            self.__date = date
        else:
            raise ValueError("Invalid date parameter")

    def __repr__(self):
        return "Date Utils Objects from oqmcf project"

    def __str__(self):
        return "Date Object: %s" % self.__date.__str__()

    def unixTime(self):
        """ Converte um objeto datetime para o padrão unix time """
        try:
            return int(mktime(self.__date.timetuple()))
        except Exception, dateException:
            pass
            #print "Date Utils Exception: %s" % dateException.message

    def toggleDate(self, date = None):
        """
         Converte entre formatos de data dd/mm/YYYY e YYYY-mm-dd
        """
        if not date:
            date = self.__date

        if (search(r'(\d{2}/\d{2}/\d{4})', date)):
            return datetime.strptime(date, "%d/%m/%Y").strftime("%Y-%m-%d")
        elif (search(r'(\d{4}-\d{2}-\d{2})', date)):
            return datetime.strptime(date, "%Y-%m-%d").strftime("%d/%m/%Y")
        else:
            return date