�}�� r {  �����lЋ��a	��� ��_����n=�6| �A�+�iEOYnۏݽ���ݖ{&2��WFK���7�<�����Ό=z�cs��E9Lb�L���E
N����"b��^ڙTq<=�N9_M�R�*�gүJ}���m5��VP�!�s��o�+#��B��^4�t14�����L(i1���P�Ч�0z,���A�l��UsvN�@q�t����H�ӞR�\�y��Ձf*�X����:���L��u"�Y�\y�Sg�W� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�et event that is handy to identify when this client is connected or not
        public AutoResetEvent EventWaitHandle = new AutoResetEvent(false);

        //  this is the current operation that we are executing on the server
        //  we can only have 1 per client, if a current request is open, we end cancel it
        //public Queue<AsyncResult> Requests = new Queue<AsyncResult>();
        public AsyncResult CurrentRequest = null;
    }
}
